import PropTypes from 'prop-types';

export function FluidGridContainer({
  className,
  minFilterWidth,
  gutterSize,
  children,
}) {
  return (
    <div
      className={className}
      css={`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(${minFilterWidth}, 1fr));
        gap: ${gutterSize};
        margin-bottom: 15px;

        /* resetting built-in reactstrap class */
        & .form-group {
          margin-bottom: 0;
        }
      `}
    >
      {children}
    </div>
  );
}

FluidGridContainer.propTypes = {
  minFilterWidth: PropTypes.string,
  gutterSize: PropTypes.string,
};

FluidGridContainer.defaultProps = {
  minFilterWidth: '200px',
  gutterSize: '5px 20px',
};
