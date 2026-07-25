import {useEffect, useLayoutEffect, useRef, useState} from 'react';

// Minimal in-house replacement for `motion/react`'s `motion.div`, covering only the
// subset of the API this codebase actually uses: initial/animate/whileInView (with
// viewport.once) for scroll-triggered entrances, whileHover/whileTap for button
// micro-interactions, and transition.repeat === Infinity for looping pulses.
// Built on the native Web Animations API so no animation library is bundled.

const TRANSFORM_KEYS = ['x', 'y', 'scale'];
const DEFAULTS = {opacity: 1, x: 0, y: 0, scale: 1};
const SPRING_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EASE_ALIASES = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

function toCssEasing(ease) {
  if (Array.isArray(ease)) return `cubic-bezier(${ease.join(',')})`;
  if (typeof ease === 'string') return EASE_ALIASES[ease] || ease;
  return 'ease';
}

function toMs(seconds, fallback) {
  return (seconds ?? fallback) * 1000;
}

function toTransformValue(key, value) {
  if (key === 'x') return `translateX(${typeof value === 'number' ? `${value}px` : value})`;
  if (key === 'y') return `translateY(${typeof value === 'number' ? `${value}px` : value})`;
  return `scale(${value})`;
}

function toStaticStyle(state) {
  const style = {};
  const transformParts = [];
  for (const [key, value] of Object.entries(state)) {
    if (TRANSFORM_KEYS.includes(key)) transformParts.push(toTransformValue(key, value));
    else style[key] = value;
  }
  if (transformParts.length) style.transform = transformParts.join(' ');
  return style;
}

// Builds a WAAPI keyframe object animating from `from` (plain values) to `to`
// (plain values or keyframe arrays), plus the plain state it settles on once done.
function buildTween(from, to) {
  const keys = new Set([...Object.keys(from), ...Object.keys(to)]);
  let frameCount = 2;
  for (const key of keys) {
    if (Array.isArray(to[key])) frameCount = Math.max(frameCount, to[key].length);
  }

  const plainSeries = {};
  const transformSeries = {};
  const finalState = {};

  for (const key of keys) {
    const hasTarget = key in to;
    const targetRaw = hasTarget ? to[key] : (DEFAULTS[key] ?? from[key]);
    const fromValue = from[key] ?? DEFAULTS[key];
    const series = [];

    for (let i = 0; i < frameCount; i++) {
      const t = i / (frameCount - 1);
      if (Array.isArray(targetRaw)) {
        series.push(targetRaw[Math.round(t * (targetRaw.length - 1))]);
      } else if (typeof targetRaw === 'number' && typeof fromValue === 'number') {
        series.push(fromValue + (targetRaw - fromValue) * t);
      } else {
        series.push(i === 0 && fromValue !== undefined ? fromValue : targetRaw);
      }
    }

    finalState[key] = Array.isArray(targetRaw) ? targetRaw[targetRaw.length - 1] : targetRaw;
    (TRANSFORM_KEYS.includes(key) ? transformSeries : plainSeries)[key] = series;
  }

  const keyframes = {...plainSeries};
  const transformKeys = Object.keys(transformSeries);
  if (transformKeys.length) {
    keyframes.transform = Array.from({length: frameCount}, (_, i) =>
      transformKeys.map((k) => toTransformValue(k, transformSeries[k][i])).join(' ')
    );
  }

  return {keyframes, finalState};
}

function useInView(elRef, active, once) {
  const [inView, setInView] = useState(!active);

  useEffect(() => {
    if (!active) return undefined;
    const el = elRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {threshold: 0.15}
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active, once, elRef]);

  return inView;
}

function MotionDiv({
  initial,
  animate,
  whileInView,
  viewport,
  whileHover,
  whileTap,
  transition,
  style,
  children,
  ...rest
}) {
  const elRef = useRef(null);
  const animRef = useRef(null);
  const restStateRef = useRef(initial || {});
  const loopConfigRef = useRef(null);
  const inView = useInView(elRef, Boolean(whileInView), viewport?.once !== false);

  const runAnimation = (target, transitionCfg, {loop = false} = {}) => {
    const el = elRef.current;
    if (!el) return;
    const {keyframes, finalState} = buildTween(restStateRef.current, target);
    animRef.current?.cancel();
    const easing = transitionCfg?.type === 'spring' ? SPRING_EASING : toCssEasing(transitionCfg?.ease);
    const anim = el.animate(keyframes, {
      duration: Math.max(1, toMs(transitionCfg?.duration, 0.3)),
      delay: toMs(transitionCfg?.delay, 0),
      easing,
      iterations: loop ? Infinity : 1,
      fill: 'forwards',
    });
    animRef.current = anim;
    if (loop) {
      loopConfigRef.current = {target, transitionCfg};
    } else {
      loopConfigRef.current = null;
      anim.finished
        .then(() => {
          restStateRef.current = {...restStateRef.current, ...finalState};
        })
        .catch(() => {});
    }
  };

  useLayoutEffect(() => {
    if (!inView) return;
    const target = {...animate, ...whileInView};
    if (!Object.keys(target).length) return;

    if (transition?.repeat === Infinity) {
      const enterTarget = {};
      for (const [key, value] of Object.entries(target)) {
        enterTarget[key] = Array.isArray(value) ? value[0] : value;
      }
      const el = elRef.current;
      const {keyframes, finalState} = buildTween(restStateRef.current, enterTarget);
      const enterAnim = el.animate(keyframes, {
        duration: Math.max(1, toMs(transition?.duration, 0.3)),
        delay: toMs(transition?.delay, 0),
        easing: toCssEasing(transition?.ease),
        fill: 'forwards',
      });
      animRef.current = enterAnim;
      enterAnim.finished
        .then(() => {
          restStateRef.current = {...restStateRef.current, ...finalState};
          runAnimation(target, {...transition, delay: 0}, {loop: true});
        })
        .catch(() => {});
    } else {
      runAnimation(target, transition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleHoverStart = () => {
    if (!whileHover) return;
    const {transition: hoverTransition, ...target} = whileHover;
    runAnimation(target, {...transition, ...hoverTransition, delay: hoverTransition?.delay ?? 0});
  };

  const revertToRest = () => {
    if (loopConfigRef.current) {
      runAnimation(loopConfigRef.current.target, loopConfigRef.current.transitionCfg, {loop: true});
      return;
    }
    runAnimation({...animate, ...whileInView}, {...transition, delay: 0});
  };

  const handleTapStart = () => {
    if (!whileTap) return;
    const {transition: tapTransition, ...target} = whileTap;
    runAnimation(target, {...transition, ...tapTransition, delay: tapTransition?.delay ?? 0});
  };

  return (
    <div
      ref={elRef}
      style={{...style, ...toStaticStyle(initial || {})}}
      onMouseEnter={whileHover ? handleHoverStart : undefined}
      onMouseLeave={whileHover ? revertToRest : undefined}
      onMouseDown={whileTap ? handleTapStart : undefined}
      onMouseUp={whileTap ? revertToRest : undefined}
      onTouchStart={whileTap ? handleTapStart : undefined}
      onTouchEnd={whileTap ? revertToRest : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

export const motion = {div: MotionDiv};
