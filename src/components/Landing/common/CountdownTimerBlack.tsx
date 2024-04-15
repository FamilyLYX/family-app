import Countdown from "react-countdown";

function CountdownTimerBlack() {
  // Calculate the target date for the 4th of April 2024, 00:00 local time
  const targetDate = Date.UTC(2024, 3, 16, 17, 0, 0);

  // Function to calculate total hours, minutes, and seconds from milliseconds
  const calculateTimeLeft = (totalMilliseconds: any) => {
    let totalSeconds = Math.floor(totalMilliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    totalSeconds = totalSeconds % 60;
    totalMinutes = totalMinutes % 60;

    return { totalHours, totalMinutes, totalSeconds };
  };

  return (
    <Countdown
    date={targetDate}
    intervalDelay={1000}
    renderer={({total }) => {
      // Using the custom function to calculate total hours, minutes, and seconds
      const { totalHours, totalMinutes, totalSeconds } = calculateTimeLeft(total);
        return (
          <div className="absolute bottom-14 left-0 right-0 w-full max-w-md  mx-auto text-center p-4 my-4 bg-black bg-opacity-5 rounded-3xl">
            <p className="text-lg text-white">
              Available in
            </p>
            <div className="flex flex-row py-4 mt-4 space-x-4">
              <div className="grow p-1 py-2 border rounded-lg">
                <span className="long-title text-3xl text-white">
                  {String(totalHours).padStart(2,'0')}
                </span>
                <span className="block text-sm text-white">Hours</span>
              </div>
              <span className="long-title text-white text-3xl mt-4">:</span>
              <div className="grow p-1 py-2 border rounded-lg">
                <span className="long-title text-3xl text-white">
                  {String(totalMinutes).padStart(2,'0')}
                </span>
                <span className="block text-sm text-white">Minutes</span>
              </div>
              <span className="long-title text-white text-3xl mt-4">:</span>
              <div className="grow p-1 py-2 border rounded-lg">
                <span className="long-title text-3xl text-white">
                  {String(totalSeconds).padStart(2,'0')}
                </span>
                <span className="block text-sm text-white">Seconds</span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default CountdownTimerBlack;
