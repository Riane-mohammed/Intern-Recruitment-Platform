// Function to convert seconds to minutes:seconds format
export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//Function to calculate the age from a birthday
export const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

//Converts a timestamp to a formatted date string (DD-MM-YYYY).
export const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
};

//Converts a comma-separated string of emails into an array of email addresses.
export const parseEmailString = (emailString) => {
    return emailString
        .split(',')
        .map(email => email.trim())  
        .filter(email => email !== ''); 
};

//Question Type 
export const questionTypes = {
    'MULTIPLE_CHOICE': 'Choix Multiple',
    'SINGLE_CHOICE': 'Choix Simple',
    'BOOLEAN': 'Oui/Non',
}

//Truncate Text
export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export const extractFilePath = (url) => {
    const baseUrl = 'http://localhost:8080/files/';
    if (url.startsWith(baseUrl)) {
        return url.substring(baseUrl.length);
    }
    return null;
}