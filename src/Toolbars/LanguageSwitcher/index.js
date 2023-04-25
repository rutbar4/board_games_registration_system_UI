import { useRef, useState } from "react";

import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Popover,
  Tooltip,
  styled,
} from "@mui/material";
import Text from "./";

import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import internationalization from "../../Translator/i18n/i18n";
import { useTranslation } from "react-i18next";

import { LT } from "country-flag-icons/react/3x2";
import { US } from "country-flag-icons/react/3x2";

const SectionHeading = styled(Typography)(
  ({ theme }) =>
    `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) =>
    `
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};

        svg {
          width: 30px;
        }
`
);

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const getLanguage = i18n.language;

  const switchLanguage = ({ lng }) => {
    internationalization.changeLanguage(lng);
  };
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t("Language Switcher")}>
        <IconButtonWrapper color="primary" ref={ref} onClick={handleOpen}>
          {getLanguage === "lt" && <LT title="Lithuanian" />}
          {getLanguage === "en" && <US title="English" />}
        </IconButtonWrapper>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            maxWidth: 240,
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t("Language Switcher")}
          </SectionHeading>
          <List
            sx={{
              p: 2,
              svg: {
                width: 26,
                mr: 1,
              },
            }}
            component="nav"
          >
            <ListItem
              className={getLanguage === "en" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "en" });
                handleClose();
              }}
            >
              <US title="English" />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="English"
              />
            </ListItem>
            <ListItem
              className={getLanguage === "lt" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "lt" });
                handleClose();
              }}
            >
              <LT title="Lithuanian" />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="Lithuanian"
              />
            </ListItem>
          </List>
          <Divider />
          <Text color="warning">
            <Box
              p={2}
              sx={{
                maxWidth: 340,
              }}
            >
              <WarningTwoToneIcon fontSize="small" />
            </Box>
          </Text>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
