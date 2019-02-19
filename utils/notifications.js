import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY = 'flashcard:notification';

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data == null) {
                Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
                    .then(({status}) => {
                        status === 'granted' ? setNotification() : askPermission()
                    })
            }
        })
}


const askPermission = () => {
    Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
        .then(({status}) => {
            if (status === 'granted') {
                return setNotification()
            }
        }).catch(err => console.warn('Falha ao solicitar a permissão', err))
};


const setNotification = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);

    Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
            time: tomorrow,
            repeat: "day"
        }
    );

    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
};

function createNotification() {
    return {
        title: 'Lets Go!',
        body: 'Hi, do not forget your lesson today.!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticker: false,
            vibrate: true
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationAsync)
}

