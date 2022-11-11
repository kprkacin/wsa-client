import { PasswordInputProps as MPasswordInputProps } from '@mantine/core';

export interface PasswordRequirementProps {
  label: string;
  meets: boolean;
}
export type PasswordInputProps = MPasswordInputProps & {
  //
};
