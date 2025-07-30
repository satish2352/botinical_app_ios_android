# Firebase Messaging
-keep class com.google.firebase.messaging.FirebaseMessagingService { *; }
-keep class com.google.firebase.iid.FirebaseInstanceIdReceiver { *; }
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.cloudmessaging.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# Needed for Google Play Services
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Prevent stripping of IntentService for FCM
-keep class * extends android.app.Service

# Keep annotations (sometimes used by Firebase)
-keepattributes *Annotation*
