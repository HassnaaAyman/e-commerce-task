export const formatDate = (date: string | number | Date) => {
  const createdAt: any = new Date(date);

  const userVisited: any = new Date();

  const diff = userVisited - createdAt;

  // convert the milliseconds to seconds
  const toSec = diff / 1000;

  // convert the seconds to minutes
  const toMin = toSec / 60;

  // convert the minutes to hours
  const toHour = toMin / 60;

  // convert the hours to days
  const toDays = toHour / 24;

  // now we'll round the days up/down
  const rounded = Math.round(toDays);

  const relativeTime: any = new Intl.RelativeTimeFormat("en").format(
    -rounded,
    "day"
  );

  if (relativeTime[0] + relativeTime[1] >= 7) {
    return (
      createdAt.getDate() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getFullYear()
    );
  } else {
    return relativeTime;
  }
};
