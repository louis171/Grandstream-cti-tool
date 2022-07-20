import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link as RouterLink } from "react-router-dom";

const VersionView = () => {
  const [versionNode, setVersionNode] = useState([]);

  useEffect(() => {
    const getVersion = async () => {
      // sends request to electron main process to query for version details
      let obj = await electron.app.version();
      // Array of conditions i.e. the version info that will be displayed
      let conditions = ["node", "electron", "chrome"];

      // Object.keys returns array of a given object's own enumerable property names
      // e.g. ["node", "v8"]
      // .filter searches each string in the array for results containing the conditions array
      // .some allows for multiple conditions without nesting .includes
      // .reduce performs a function on each of the filtered array elements
      // in this case creating a new object with the required property names and their associated values
      // e.g. { "node", "16.14.2", "electron", "19.0.7" }
      let data = Object.keys(obj)
        .filter((key) => conditions.some((el) => key.includes(el)))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: obj[key] });
        }, {});

      // Transform the object above in an array or key value pairs
      // e.g. [ {"node": "16.14.2"}, {"electron": "19.0.7"} ]
      data = Object.keys(data).map((key) => ({
        label: key,
        value: data[key],
        id: key.indexOf(),
      }));

      // Quickly add app version
      // TODO retrieve from main process
      data.push({ label: "app", value: "1.0.0" });

      // Add an id to each object in the array created above
      data.forEach((item, i) => {
        item.id = i;
      });

      // Returns version info as array of object to be mapped
      setVersionNode(data);
    };

    getVersion();
  }, []);
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={1}>
        {versionNode.map((item) => (
          <Grid
            /* Easy way of adding a key */
            /* Should probably change this */
            key={(item.id += 1000)}
            item
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <Typography key={item.id} variant="body2">
              {item.label} - {item.value}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12}></Grid>
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
