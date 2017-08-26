// @flow
import React from 'react';

const RenderSubmit = ({ reset, submitting, text, pristine, invalid }: Object) =>
  (
    <div style={{
      display: 'flex',
    }}
    >
      <button
        style={{
          flex: '1',
        }}
        className="btn btn-info"
        type="submit"
        disabled={pristine || invalid || submitting}
      >
        <span className="fa fa-send" style={{ marginRight: '5px' }} />
        {submitting ? 'Submitting...' : text}
      </button>

      <button
        style={{
          marginLeft: '4rem',
        }}
        className="btn btn-outline-warning"
        disabled={pristine || submitting}
        onClick={reset}
      >
      Reset
    </button>
    </div>
  );

export default RenderSubmit;
