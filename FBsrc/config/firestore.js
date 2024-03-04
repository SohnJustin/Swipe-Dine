import firestore from '@react-native-firebase/firestore';

function sendMessage(senderId, receiverId, messageText) {
  firestore()
    .collection('messages')
    .add({
      senderId,
      receiverId,
      message: messageText,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
}


function getMessages(userId) {
    firestore()
      .collection('messages')
      .where('receiverId', '==', userId)
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
  
        console.log(messages);
        // Update your state or UI with these messages
      });
  }
  