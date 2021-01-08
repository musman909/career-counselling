import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class Reviews extends Component {
  state = {
    value: 2
  };

  render() {
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={this.state.value}
            onChange={(event, newValue) => {
              this.setState({ value: newValue });
            }}
          />
        </Box>
      </div>
    );
  }
}

export default Reviews;
