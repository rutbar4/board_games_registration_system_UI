import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review({ setFormData, formData }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Game summary
      </Typography>
      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Organisation:
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {formData.organisation}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          Board game name:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* //padaryti kad būtų galima pasirinkti tipą ar įrašyti iš esamų */}
          Board game type:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.boardGameType}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          Players:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.players}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          Winner:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.winner}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Time played:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.time_h}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Winner points:
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formData.winnerPoints}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
