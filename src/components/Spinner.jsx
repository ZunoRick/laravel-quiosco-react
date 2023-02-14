import ClipLoader from "react-spinners/ClipLoader";


export const Spinner = ({ isLoading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(255, 183, 0)",
  }

  return (
    <div className="sk-chase">
      <ClipLoader
        cssOverride={override}
        size={150}
        color={"#123abc"}
        loading={isLoading}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
