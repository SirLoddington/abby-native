import AsyncStorage from '@react-native-async-storage/async-storage';

// Check for if type of token is expired
export function isExpired(tokenName, token) {
  switch (tokenName) {
    case 'test':
      return false;
    default:
      return false;
  }
}

// Function to generate a token for the type tokenName
export function generateToken(tokenName) {
  switch (tokenName) {
    case 'test':
      return 'testToken';
    default:
      return 'invalid token type in generateToken';
  }
}

// export function getToken(tokenName) {
//   AsyncStorage.getItem(tokenName)
//     .then((token) => {
//       const expired = isExpired(tokenName, token);

//       //Expired or not yet created
//       if (token === null || expired) {
//         const newToken = generateToken(tokenName);
//         console.log('newToken');
//         console.log(newToken);
//         storeToken(newToken, tokenName);
//         return newToken;
//       } else {
//         console.log('found token');
//         console.log(token);
//         return token;
//       }
//     })
//     .catch((error) => {
//       return `error: ${error}`;
//     });
// }

// Function to get a token
// Returns a promise
export async function getToken(tokenName) {
  try {
    const token = await AsyncStorage.getItem(tokenName);
    const expired = isExpired(tokenName, token);

    //Expired or not yet created
    if (token === null || expired) {
      const newToken = generateToken(tokenName);
      console.log('newToken');
      console.log(newToken);
      storeToken(newToken, tokenName);
      return newToken;
    } else {
      console.log('found token');
      console.log(token);
      return token;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}

// // Storing a token
// export async function storeToken(token, tokenName) {
//   try {
//     await AsyncStorage.setItem(tokenName, token);
//     return 'success';
//   } catch (error) {
//     return `error: ${error}`;
//   }
// }

// // Retrieving a token
// export async function retrieveToken(tokenName) {
//   try {
//     const token = await AsyncStorage.getItem(tokenName);
//     if (token !== null) {
//       return token;
//     } else {
//       return 'not found';
//     }
//   } catch (error) {
//     return `error: ${error}`;
//   }
// }

// // Removing a token
// export async function removeToken(tokenName) {
//   try {
//     await AsyncStorage.removeItem(tokenName);
//     return 'success';
//   } catch (error) {
//     return `error: ${error}`;
//   }
// }
