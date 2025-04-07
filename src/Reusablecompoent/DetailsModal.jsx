import React from 'react';
import { StyleSheet, View } from 'react-native';

const DetailsModal = () => {
  return (
    <View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  bgImage: {
    height: hp(40),
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  image: {
    height: '95%',
    width: '100%',
    resizeMode: 'cover',
  },
  subcontainer1: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    padding: 10,
  },
  button1: {
    width: '80%',
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
    margin: 10,

  },
  button: {
    width: '40%',
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
    margin: 10,

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
  },
  headingwrap: {
    // alignItems: 'flex-start',
    top: 0,
    marginHorizontal: 15,
  },
  headtext: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: '#000000',
    paddingVertical: 0,
  },
  headtext2: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: '#01595A',
    padding: 5,
  },
  buttonview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',

  },
  headtext2wrap: {
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselItem: {
    width: '100%', // Set width to full width
    height: hp(28),
    borderRadius: 10,
    overflow: 'hidden',
    // marginBottom: 10,

  },
  carouselImage: {
    // flex: 1,
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    top: hp(20), // Adjust top position as needed

  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#ffff',
    marginHorizontal: 4,

  },
  paginationInactiveDot: {
    backgroundColor: '#C4C4C4',

  },
  carouselwrap: {
    alignItems: "center",
    justifyContent: 'center',
    height: '35%',
    marginVertical: wp(4)

  },
  dibtn: {
    width: '30%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#01595A',
    marginLeft: 20
  },
})

export default DetailsModal;
