import CodeIcon from '@mui/icons-material/Code';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { Box, Button, Divider, Stack } from '@mui/material';
import isHotkey from 'is-hotkey';
import { useCallback, useMemo } from 'react';
import { createEditor, Editor, Element as SlateElement, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, useSlate, withReact } from 'slate-react';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

interface RichTextProps {
  initialValue: any;
  onChange?: (...args) => void;
}

// @ts-ignore
function RichText({ initialValue, onChange }: RichTextProps) {
  const readOnly = typeof onChange == 'undefined';
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        minHeight: '120px',
        flex: 1,
        '&:hover': { borderBottom: readOnly ? null : '1px solid #1976d2' },
      }}>
      <Slate editor={editor} value={initialValue} onChange={onChange}>
        {readOnly ? null : <Menu />}
        <Editable
          style={{ minHeight: '120px' }}
          readOnly={readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter text…"
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </Box>
  );
}
function Menu() {
  return (
    <>
      <Stack spacing={1} direction="row" sx={{ height: '26px' }}>
        <MarkButton format="bold" icon={<FormatBoldIcon />} />
        <MarkButton format="italic" icon={<FormatItalicIcon />} />
        <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
        <MarkButton format="code" icon={<CodeIcon />} />
        <BlockButton format="heading-one" icon={<LooksOneIcon />} />
        <BlockButton format="heading-two" icon={<LooksTwoIcon />} />
        <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
        <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
        <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
        <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
        <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
        <BlockButton format="right" icon={<FormatAlignRightIcon />} />
        <BlockButton format="justify" icon={<FormatAlignJustifyIcon />} />
      </Stack>
      <Divider sx={{ marginTop: '16px' }}></Divider>
    </>
  );
}

function toggleBlock(editor, format) {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function isBlockActive(editor, format, blockType = 'type') {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
}

function isMarkActive(editor, format) {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc ml-16" style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={{ ...style }} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={{ ...style }} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={{ ...style, marginLeft: '2px' }} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={{ ...style, marginLeft: '2px' }} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

function BlockButton({ format, icon }) {
  const editor = useSlate();
  const active = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
  return (
    <Button
      sx={{ minWidth: 0, padding: 0, margin: 0 }}
      size="small"
      variant={active ? 'outlined' : 'text'}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      {icon}
    </Button>
  );
}

function MarkButton({ format, icon }) {
  const editor = useSlate();
  const active = isMarkActive(editor, format);
  return (
    <Button
      sx={{ minWidth: 0, padding: 0, margin: 0 }}
      size="small"
      variant={active ? 'outlined' : 'text'}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      {icon}
    </Button>
  );
}

export default RichText;
