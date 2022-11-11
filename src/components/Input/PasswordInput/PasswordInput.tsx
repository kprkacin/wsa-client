import React, { useState } from 'react';
import {
  PasswordInput as MPasswordInput,
  Progress,
  Popover,
  createStyles,
} from '@mantine/core';
import { requirements } from './consts';
import { getStrength } from './helpers';
import { default as PasswordRequirement } from './PasswordRequirement';
import { PasswordInputProps } from './types';
import { IconLock } from '@tabler/icons';
const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.gray[6],
  },
  root: {
    textAlign: 'start',
  },
}));
const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { classes } = useStyles();
  const { value, placeholder, label, ...otherInputProps } = props;

  const strength = getStrength(value as string);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <div>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transition="pop"
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <MPasswordInput
              withAsterisk
              classNames={{
                root: classes.root,
                label: classes.label,
              }}
              icon={<IconLock size={16} />}
              label={label}
              placeholder={placeholder}
              value={value}
              {...otherInputProps}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={(value as string).length > 5}
          />
          {requirements.map((requirement, index) => (
            <PasswordRequirement
              key={index}
              label={requirement.label}
              meets={requirement.re.test(value as string)}
            />
          ))}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default PasswordInput;
