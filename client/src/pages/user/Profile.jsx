import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import FullWidthTabs from "./TabPanel";

const Profile = () => {
  const api = useAxiosPrivate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api
      .get("/api/user/profile")
      .then(({ data }) => {
        setInfo(data);
      })
      .catch((error) => {
        setInfo(null);
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="xl">


      <FullWidthTabs />

      {/* {info ? (
        <>
          <Typography>Name: {info.name}</Typography>
          <Typography>Email: {info.email}</Typography>
        </>
      ) : (
        "loading"
      )} */}
    </Container>
  );
};

export default Profile;
