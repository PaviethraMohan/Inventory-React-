import PageNAN from "../Images/PageNAN.jpg";
function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        backgroundImage: `url(${PageNAN})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
    </div>
  );
}
export default PageNotFound;
