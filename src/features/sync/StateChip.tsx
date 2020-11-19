import { Chip } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DescriptionIcon from '@material-ui/icons/Description';
import DiscFullIcon from '@material-ui/icons/DiscFull';
import ErrorIcon from '@material-ui/icons/Error';
import GetAppIcon from '@material-ui/icons/GetApp';
import HelpIcon from '@material-ui/icons/Help';
import ListAltIcon from '@material-ui/icons/ListAlt';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PauseIcon from '@material-ui/icons/Pause';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import TocIcon from '@material-ui/icons/Toc';
import React from 'react';
import { TorrentInfoState } from '../../api/generated-types/Maindata.response';

interface StateChipValues {
  displayText: string;
  tooltip: string;
  icon: React.ReactElement;
  muiPalette: PaletteColor;
}
const getChipData = (torrentState: TorrentInfoState, theme: Theme): StateChipValues => {
  switch (torrentState) {
    case 'allocating':
      return {
        displayText: 'Allocating',
        tooltip: 'Allocating disk space.',
        icon: <DiscFullIcon />,
        muiPalette: theme.palette.info,
      };
    case 'checkingDL':
      return {
        displayText: 'Checking & downloading',
        tooltip: 'Torrent has NOT finished downloading and is being checked.',
        icon: <PlaylistAddCheckIcon />,
        muiPalette: theme.palette.info,
      };
    case 'checkingResumeData':
      return {
        displayText: 'Checking resume data',
        tooltip: 'Checking resume data on startup.',
        icon: <PlaylistAddCheckIcon />,
        muiPalette: theme.palette.info,
      };
    case 'checkingUP':
      return {
        displayText: 'Checking & uploading',
        tooltip: 'Torrent has finished downloading and is being checked.',
        icon: <PlaylistAddCheckIcon />,
        muiPalette: theme.palette.success,
      };
    case 'downloading':
      return {
        displayText: 'Downloading',
        tooltip: 'Torrent is being downloaded and data is being transferred',
        icon: <GetAppIcon />,
        muiPalette: theme.palette.info,
      };
    case 'error':
      return {
        displayText: 'Error',
        tooltip: 'Torrent is Paused and an error has occured.',
        icon: <ErrorIcon />,
        muiPalette: theme.palette.error,
      };
    case 'forceDL':
      return {
        displayText: 'Downloading (forced)',
        tooltip: 'Torrent is forced to downloading to ignore queue limit.',
        icon: <OfflineBoltIcon />,
        muiPalette: theme.palette.info,
      };
    case 'forcedUP':
      return {
        displayText: 'Uploading (forced)',
        tooltip: 'Torrent is forced to uploading to ignore queue limit.',
        icon: <OfflineBoltIcon />,
        muiPalette: theme.palette.success,
      };
    case 'metaDL':
      return {
        displayText: 'Downloading (metadata)',
        tooltip: 'Torrent has just started downloading and is fetching metadata',
        icon: <TocIcon />,
        muiPalette: theme.palette.info,
      };
    case 'missingFiles':
      return {
        displayText: 'Missing files',
        tooltip: 'Torrent data files is missing.',
        icon: <DescriptionIcon />,
        muiPalette: theme.palette.warning,
      };
    case 'moving':
      return {
        displayText: 'Moving',
        tooltip: 'Torrent is moving to another location.',
        icon: <SettingsEthernetIcon />,
        muiPalette: theme.palette.info,
      };
    case 'pausedDL':
      return {
        displayText: 'Paused (incomplete)',
        tooltip: 'Torrent is paused and has NOT finished downloading.',
        icon: <PauseIcon />,
        muiPalette: theme.palette.info,
      };
    case 'pausedUP':
      return {
        displayText: 'Paused (complete)',
        tooltip: 'Torrent is paused and has finished downloading.',
        icon: <PauseIcon />,
        muiPalette: theme.palette.success,
      };
    case 'queuedDL':
      return {
        displayText: 'Queued (incomplete)',
        tooltip: 'Torrent is queued for download',
        icon: <ListAltIcon />,
        muiPalette: theme.palette.info,
      };
    case 'queuedUP':
      return {
        displayText: 'Queued (complete)',
        tooltip: 'Torrent is queued for download',
        icon: <ListAltIcon />,
        muiPalette: theme.palette.info,
      };
    case 'stalledDL':
      return {
        displayText: 'Stalled (incomplete)',
        tooltip: 'Torrent is being downloaded, but no connections were made.',
        icon: <AcUnitIcon />,
        muiPalette: theme.palette.info,
      };
    case 'stalledUP':
      return {
        displayText: 'Stalled (complete)',
        tooltip: 'Torrent is being seeded, but no connections were made.',
        icon: <AcUnitIcon />,
        muiPalette: theme.palette.warning,
      };
    case 'unknown':
      return {
        displayText: 'Unknown status',
        tooltip: 'Torrent status is unknown.',
        icon: <HelpIcon />,
        muiPalette: theme.palette.error,
      };
    case 'uploading':
      return {
        displayText: 'Uploading',
        tooltip: 'Torrent is being seeded and data is being transferred.',
        icon: <PublishIcon />,
        muiPalette: theme.palette.success,
      };
    default:
      throw new Error(`Unexpected torrent state: ${torrentState}`);
  }
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stateChipRoot: {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    primaryChipAugmentation: {
      backgroundColor: (chipData: StateChipValues) => {
        return theme.palette.type === 'light' ? chipData.muiPalette.main : chipData.muiPalette.dark;
      },
      color: (chipData: StateChipValues) => {
        return chipData.muiPalette.contrastText;
      },
    },
  })
);

interface Props {
  torrentState: TorrentInfoState;
}
export const StateChip = ({ torrentState }: Props): JSX.Element => {
  const theme = useTheme();
  const chipData = getChipData(torrentState, theme);
  const classes = useStyles(chipData);
  return (
    <Chip
      size="small"
      color="primary"
      classes={{ root: classes.stateChipRoot, colorPrimary: classes.primaryChipAugmentation }}
      label={chipData.displayText}
      icon={chipData.icon}
    />
  );
};
