
import { Network } from '@capacitor/network';

// Network status monitoring
let isOnline = true;

const checkNetworkStatus = async () => {
  const status = await Network.getStatus();

  if (!status.connected && isOnline) {
    // Just went offline
    isOnline = false;
    window.location.href = 'offline.html';
  } else if (status.connected && !isOnline) {
    // Just came back online
    isOnline = true;
    window.location.href = 'https://pantry-chef-dcd1358d.base44.app/Home';
  }
};

// Initial check
checkNetworkStatus();

// Listen for network changes
Network.addListener('networkStatusChange', (status) => {
  if (!status.connected && isOnline) {
    isOnline = false;
    window.location.href = 'offline.html';
  } else if (status.connected && !isOnline) {
    isOnline = true;
    window.location.href = 'https://pantry-chef-dcd1358d.base44.app/Home';
  }
});
