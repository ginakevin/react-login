import * as React from 'react';
import { useState } from 'react';
import { TextareaAutosize, Button, Box } from '@mui/material';
import { FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatColorText,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatListBulleted,
    FormatListNumbered,
 } from '@mui/icons-material';


 export default function Wysiwyg(){
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [color, setColor] = useState('#000000');
    const [align, setAlign] = useState('left');
    const [list, setList] = useState(false);
    const [text, setText] = useState('Initial Text');
  
    const handleBoldClick = () => {
      setBold(!bold);
    };
  
    const handleItalicClick = () => {
      setItalic(!italic);
    };
  
    const handleUnderlineClick = () => {
      setUnderline(!underline);
    };
  
    const handleColorChange = (event) => {
      setColor(event.target.value);
    };
  
    const handleAlignLeftClick = () => {
      setAlign('left');
    };
  
    const handleAlignCenterClick = () => {
      setAlign('center');
    };
  
    const handleAlignRightClick = () => {
      setAlign('right');
    };
  
    const handleListClick = () => {
      setList(!list);
    };
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <Box sx={{
        marginTop: 6,
      }}>
        <div>
          <Button onClick={handleBoldClick}>
            <FormatBold color={bold ? 'primary' : 'inherit'} />
          </Button>
          <Button onClick={handleItalicClick}>
            <FormatItalic color={italic ? 'primary' : 'inherit'} />
          </Button>
          <Button onClick={handleUnderlineClick}>
            <FormatUnderlined color={underline ? 'primary' : 'inherit'} />
          </Button>
          <input type="color" value={color} onChange={handleColorChange} />
          <Button onClick={handleAlignLeftClick}>
            <FormatAlignLeft color={align === 'left' ? 'primary' : 'inherit'} />
          </Button>
          <Button onClick={handleAlignCenterClick}>
            <FormatAlignCenter color={align === 'center' ? 'primary' : 'inherit'} />
          </Button>
          <Button onClick={handleAlignRightClick}>
            <FormatAlignRight color={align === 'right' ? 'primary' : 'inherit'} />
          </Button>
          <Button onClick={handleListClick}>
            {list ? (
              <FormatListNumbered color="primary" />
            ) : (
              <FormatListBulleted color="primary" />
            )}
          </Button>
        </div>
        <TextareaAutosize
          value={text}
          onChange={handleChange}
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
            color: color,
            textAlign: align,
            listStyleType: list ? 'decimal' : 'none',
          }}
        />
      </Box>
    );
 }