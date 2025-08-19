import { differenceInDays, differenceInHours, differenceInMinutes, format, isValid, parseISO } from "date-fns";

export const formatNumber = (num: number): string=>{
    if(num >= 1000) return Math.floor(num / 1000 ) + "K";
    return num.toString();
}

export const formatDate = (dateString: string | number | Date): string=>{
    const now = new Date();
    let date: Date;

    if (typeof dateString === "number") {
        date = new Date(dateString);
    } else if (typeof dateString === "string") {
        date = parseISO(dateString); // handles ISO like "2025-08-18T01:23:45Z"
    } else {
        date = dateString;
    }
    
    const minutes = differenceInMinutes(now, date);
    const hours = differenceInHours(now, date);
    const days = differenceInDays(now, date);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    
    return `${Math.floor(days / 7)}w`
}

export const formatMessageTime = (createdAt: string | number | Date): string => {
  let date: Date;

  if (typeof createdAt === "number") {
    date = new Date(createdAt);
  } else if (typeof createdAt === "string") {
    date = parseISO(createdAt); // handles ISO like "2025-08-18T01:23:45Z"
  } else {
    date = createdAt;
  }

  if (!isValid(date)) {
    return String(createdAt); // fallback: show raw value
  }

  return format(date, "hh:mm a"); // e.g., "02:45 PM"
};
