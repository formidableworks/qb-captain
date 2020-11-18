/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Torrent state
 */
export type TorrentInfoState =
  | "error"
  | "missingFiles"
  | "uploading"
  | "pausedUP"
  | "queuedUP"
  | "stalledUP"
  | "checkingUP"
  | "forcedUP"
  | "allocating"
  | "downloading"
  | "metaDL"
  | "pausedDL"
  | "queuedDL"
  | "stalledDL"
  | "checkingDL"
  | "forceDL"
  | "checkingResumeData"
  | "moving"
  | "unknown";

/**
 * Qbittorrent webapi /api/v2/sync/maindata response.
 */
export interface MaindataResponse {
  /**
   * Response ID
   */
  rid: number;
  /**
   * Whether the response contains all the data or partial data
   */
  full_update: boolean;
  server_state?: TransferInfo;
  /**
   * Dictionary of torrenthashes: torrentInfo
   */
  torrents: {
    [k: string]: TorrentInfo;
  };
  [k: string]: unknown;
}
/**
 * Qbittorrent webapi Transfer Info
 */
export interface TransferInfo {
  /**
   * Data downloaded this session (bytes)
   */
  dl_info_speed: number;
  /**
   * Whether the response contains all the data or partial data
   */
  connection_status: "connected" | "firewalled" | "disconnected";
  [k: string]: unknown;
}
/**
 * Qbittorrent webapi Torrent Info
 */
export interface TorrentInfo {
  /**
   * Torrent hash
   */
  hash?: string;
  /**
   * Torrent name
   */
  name: string;
  /**
   * Torrent progress (percentage/100)
   */
  progress: number;
  /**
   * Torrent download speed (bytes/s)
   */
  dlspeed: number;
  /**
   * Torrent upload speed (bytes/s)
   */
  upspeed: number;
  /**
   * Total size (bytes) of files selected for download
   */
  size: number;
  /**
   * Number of seeds connected to
   */
  num_seeds: number;
  /**
   * Number of leechers connected to
   */
  num_leechs: number;
  /**
   * Torrent ETA (seconds)
   */
  eta: number;
  /**
   * Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode
   */
  priority: number;
  state: TorrentInfoState;
  [k: string]: unknown;
}
