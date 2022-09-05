import * as io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_API_URL || "";
export const socket = io.connect(SOCKET_URL);
