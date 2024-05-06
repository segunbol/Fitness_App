export const getDate = () => {
    let today = new Date();
    let next = new Date(today);
    next.setMinutes(today.getMinutes() + 30); //add 30 mins

    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    let date2 = next.getFullYear() + '-' + (next.getMonth() + 1) + '-' + next.getDate();
    let time2 = next.getHours() + ":" + next.getMinutes() + ":" + next.getSeconds();

    let currentDate = date + ' ' + time;
    let expiryDate = (date2 + ' ' + time2);

    return [currentDate, expiryDate];
} 

// utils/subscriptions.ts THIS IS CASE 1 CHATGPT

  export function calculateEndDated(startDate: Date, duration: number, durationType: 'Monthly' | 'Quarterly' | 'Biannually' | 'Annually'): Date {
    const endDate = new Date(startDate);
  
    switch (durationType) {
      case 'Monthly':
        endDate.setMonth(endDate.getMonth() + duration);
        // Handle cases where start date is not the first day of the month
        endDate.setDate(Math.max(endDate.getDate(), startDate.getDate())); // Keep the same day of the month if possible
        break;
      case 'Quarterly':
        endDate.setMonth(endDate.getMonth() + (duration * 3));
        // Handle quarter boundaries:
        const currentQuarter = Math.floor((endDate.getMonth() + 3) / 3);
        endDate.setMonth(currentQuarter * 3 - 1); // Set to the last day of the target quarter
        endDate.setDate(Math.max(endDate.getDate(), startDate.getDate())); // Keep the same day of the month if possible
        break;
      case 'Biannually':
        endDate.setMonth(endDate.getMonth() + (duration * 6));
        // Handle cases where start date is not the beginning of the year (Jan 1st)
        endDate.setMonth(Math.max(endDate.getMonth(), startDate.getMonth()));
        endDate.setDate(Math.max(endDate.getDate(), startDate.getDate())); // Keep the same day of the month if possible
        break;
      case 'Annually':
        endDate.setFullYear(endDate.getFullYear() + duration);
        // Handle cases where start date is not Jan 1st
        endDate.setMonth(Math.max(endDate.getMonth(), startDate.getMonth()));
        endDate.setDate(Math.max(endDate.getDate(), startDate.getDate())); // Keep the same day of the month if possible
        break;
      default:
        throw new Error('Invalid duration type');
    }
  
    return endDate;
  }
  