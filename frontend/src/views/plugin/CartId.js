import Cookies from "js-cookie";

function CartId() {
  const generateRandomString = () => {
    const length = 6;
    const characters = "1234567890";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    Cookies.set("cartId", randomString, { expires: 1, path: "/" }); // Expires in 1 day
  };

  const existingRandomString = Cookies.get("cartId");

  if (!existingRandomString) {
    generateRandomString();
  }

  return Cookies.get("cartId");
}

export default CartId;
