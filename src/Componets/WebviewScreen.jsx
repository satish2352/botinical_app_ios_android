import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WebviewScreen = ({ route, navigation }) => {
  const { title, url } = route.params;
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [webViewError, setWebViewError] = useState(false);

  const handleReload = () => {
    setWebViewError(false);
    setLoading(true);
    webViewRef.current?.reload();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Icon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <TouchableOpacity onPress={handleReload} style={styles.iconButton}>
          <Icon name="reload" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && !webViewError && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading {title}...</Text>
        </View>
      )}

      {/* Error View */}
      {webViewError ? (
        <ScrollView contentContainerStyle={styles.errorContainer}>
          <Icon name="warning" size={48} color="red" />
          <Text style={styles.errorText}>Failed to load content.</Text>
          <Text style={styles.errorHint}>
            Please check your connection or try again later.
          </Text>
          <TouchableOpacity onPress={handleReload} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => {
            setLoading(true);
            setWebViewError(false);
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setWebViewError(true);
            setLoading(false);
          }}
          startInLoadingState={false}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures={true}
          incognito={true}
          cacheEnabled={false}
          allowsInlineMediaPlayback={true}
          androidLayerType="hardware"
          useWebKit={true}
          originWhitelist={['*']}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('7%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 6,
  },
  title: {
    fontSize: wp('4.4%'),
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
    color: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 999,
    top: '45%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: wp('4.2%'),
    color: '#000',
  },
  errorContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
  },
  errorText: {
    fontSize: wp('4.8%'),
    fontWeight: '600',
    marginTop: hp('2%'),
    color: '#000',
  },
  errorHint: {
    fontSize: wp('3.8%'),
    marginTop: hp('1%'),
    textAlign: 'center',
    color: '#777',
  },
  retryButton: {
    marginTop: hp('3%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});

export default WebviewScreen;
