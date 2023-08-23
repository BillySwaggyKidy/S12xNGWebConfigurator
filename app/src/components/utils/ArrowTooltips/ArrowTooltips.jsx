import Tooltip from '@mui/material/Tooltip';

// this custom component is an arrow tooltips
export default function ArrowTooltips({text, placement="bottom", children}) {
    return (
        <Tooltip title={text}  placement={placement} arrow>
          {children}
        </Tooltip>
    );
}