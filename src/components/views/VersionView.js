import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { guidGenerator } from "../functions/functions";

import { Link as RouterLink } from "react-router-dom";

const VersionView = () => {
  const [versionNode, setVersionNode] = useState([]);

  useEffect(() => {
    const getVersion = async () => {
      let obj = await electron.app.version();
      let conditions = ["node", "electron", "chrome"];

      let data = Object.keys(obj)
        .filter((key) => conditions.some((el) => key.includes(el)))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: obj[key] });
        }, {});

      data = Object.keys(data).map((key) => ({
        label: key,
        value: data[key],
        id: key.indexOf(),
      }));

      data.push({ label: "app", value: "1.0.0" });

      data.forEach((item, i) => {
        item.id = i;
      });

      setVersionNode(data);
      console.log(data);
    };

    getVersion();
  }, []);
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={1}>
        {versionNode.map((item) => (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography key={item.id} variant="body2">
              {item.label} - {item.value}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12}>

        </Grid>
      </Grid>
      <Button
        sx={{ position: "absolute", bottom: 20, right: 20 }}
        component={RouterLink}
        to="/"
        variant="contained"
      >
        Close
      </Button>
    </Box>
  );
};

export default VersionView;
