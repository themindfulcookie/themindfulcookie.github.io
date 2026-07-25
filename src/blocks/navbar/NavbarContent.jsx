import useMediaQuery from "../../hooks/useMediaQuery";
import { mqDown } from "../../theme/breakpoints";
import { NavMenu, NavMenuDrawer } from "../../components/navbar/NavItems";
import NavSecondaryButton from "../../components/navbar/NavSecondaryButton";
import ButtonAnimationWrapper from "../../components/ButtonAnimationWrapper";
import NavPrimaryButton from "../../components/navbar/NavPrimaryButton";
import MenuPopper from "../../components/navbar/MenuPopper";
import StrokeIcon from "../../components/StrokeIcon";
import Menu from "../../assets/icons/Menu";
import Cookie from "../../assets/icons/Cookie";
import styles from './NavbarContent.module.css';

export default function NavbarContent({ navItems, primaryBtn, secondaryBtn }) {
  const downMD = useMediaQuery(mqDown(1024));

  return (
    <div className={styles.row}>
      {!downMD && navItems && (
        <div className={styles.pillContainer}>
          <NavMenu {...{ navItems }} />
        </div>
      )}
      <div className={styles.actions}>
        {!downMD && (
          <>
            <NavSecondaryButton {...secondaryBtn} />
            <NavPrimaryButton {...primaryBtn} />
          </>
        )}
        {downMD && (
          <div className={styles.mobileActionsWrap}>
            <MenuPopper
              drawerToggleProps={{
                children: <StrokeIcon icon={Menu} size={24} color="var(--color-primary-dark)" strokeWidth={2} />,
                style: { minWidth: 40, width: 40, height: 40, padding: 0 }
              }}
              homeProps={{
                children: <StrokeIcon icon={Cookie} size={24} color="var(--color-primary-dark)" strokeWidth={2} />,
                style: { minWidth: 40, width: 40, height: 40, padding: 0 }
              }}
            >
              <div className={styles.drawerContent}>
                {navItems && <NavMenuDrawer {...{ navItems }} />}
                {downMD && (
                  <div className={styles.drawerFooter}>
                    <NavSecondaryButton {...secondaryBtn} />
                    <ButtonAnimationWrapper>
                      <NavPrimaryButton {...primaryBtn} />
                    </ButtonAnimationWrapper>
                  </div>
                )}
              </div>
            </MenuPopper>
          </div>
        )}
      </div>
    </div>
  );
}
