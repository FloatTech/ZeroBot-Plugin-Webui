import { withInstall } from '/@/utils';
import botSwitch from './src/BotSwitch.vue';
import messageSendBox from './src/MessageSendBox.vue';
import messageWebsocket from './src/MessageWebsocket.vue';
import logWebsocket from './src/LogWebsocket.vue';
import messageSendSelect from './src/MessageSendSelect.vue';

export const BotSwitch = withInstall(botSwitch);
export const MessageSendBox = withInstall(messageSendBox);
export const MessageWebsocket = withInstall(messageWebsocket);
export const LogWebsocket = withInstall(logWebsocket);
export const MessageSendSelect = withInstall(messageSendSelect);
