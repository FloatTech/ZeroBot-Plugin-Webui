import { withInstall } from '/@/utils';
import botSwitch from './src/BotSwitch.vue';
import messageSendBox from './src/MessageSendBox.vue';
import messageWebsocket from './src/MessageWebsocket.vue';
import logWebsocket from './src/LogWebsocket.vue';
import groupAndFriendSelect from './src/select/GroupAndFriendSelect.vue';
import groupSelect from './src/select/GroupSelect.vue';
import groupMemberSelect from './src/select/GroupMemberSelect.vue';
import friendSelect from './src/select/FriendSelect.vue';

export const BotSwitch = withInstall(botSwitch);
export const MessageSendBox = withInstall(messageSendBox);
export const MessageWebsocket = withInstall(messageWebsocket);
export const LogWebsocket = withInstall(logWebsocket);
export const GroupAndFriendSelect = withInstall(groupAndFriendSelect);
export const GroupSelect = withInstall(groupSelect);
export const GroupMemberSelect = withInstall(groupMemberSelect);
export const FriendSelect = withInstall(friendSelect);
