rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.data.keys().hasAll(['email', 'name', 'role'])
                    && request.resource.data.email is string
                    && request.resource.data.name is string
                    && request.resource.data.role in ['user', 'admin']
                    && request.resource.data.email == request.resource.data.email;
    }

    match /users/{userId}/profile/{document=**} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && get(/databases/$(database)/documents/users/$(userId)).data.role == 'admin';
    }

    match /admin/{document=**} {
      allow read, write: if request.auth != null
                         && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}