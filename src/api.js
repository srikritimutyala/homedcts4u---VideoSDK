//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxOTJjZWE2Mi04NDMxLTRlYWQtOWY2OS1mZTIzZmYwNjY5YmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNDg3MzA2MCwiZXhwIjoxNzMyNjQ5MDYwfQ.3OErQrJaPap-4E3hL3S8gA4eHvqWm842JeJ7d0ToHHQ";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  console.log("inside the cnew classsssss")
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  console.log("needthe room: "+roomId)

  return roomId;
};