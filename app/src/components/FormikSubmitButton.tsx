/**
 * SubmitButton Component
 *
 * This component renders a button that triggers a form submission using Formik.
 * It displays a loading spinner when the form is being submitted.
 *
 * Props:
 * - children: ReactNode | Function - The content to be displayed inside the button.
 * - className: string - Additional class names for styling the button.
 * - ...rest: PressableProps - Other props to be passed to the Button component.
 *
 * Usage:
 * <SubmitButton className="custom-class">Submit</SubmitButton>
 */

import { Button, type ButtonProps } from '@shadcn/components/ui';
import { RotateCw } from '@shadcn/icons';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { useCallback } from 'react';

interface SubmitButtonProps extends ButtonProps {
  className?: string;
  children: React.ReactNode | ((props: { pressed: boolean }) => React.ReactNode);
  shouldResetForm?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { children, className, shouldResetForm, ...rest } = props;
  const { submitForm, isSubmitting, setSubmitting, resetForm } = useFormikContext();

  const onSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      await submitForm();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
      if (shouldResetForm) resetForm();
    }
  }, [setSubmitting, submitForm]);

  return (
    <Button
      disabled={isSubmitting}
      onPress={onSubmit}
      className={clsx('flex flex-row rounded-xl my-2', className)}
      {...rest}
    >
      {isSubmitting && (
        <RotateCw className='mr-4 h-6 w-6 animate-spin' key={'loading'} stroke={'#fff'} />
      )}
      {typeof children === 'function' ? children({ pressed: isSubmitting }) : children}
    </Button>
  );
};
