import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67f66c8b00220fc6efe0')
    .setPlatform('dev.janoscsordas.shelfie')

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);