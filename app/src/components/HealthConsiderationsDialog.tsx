import { Button } from '@shadcn/components';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@shadcn/components/ui/alert-dialog';
import { Text } from '@shadcn/components/ui/text';
import { iconWithClassName } from '@shadcn/icons/iconWithClassName';
import { CheckCircle, Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';

iconWithClassName(Plus);
iconWithClassName(CheckCircle);
iconWithClassName(X);

interface HealthConsiderationsAlertProps {
  title: string;
  currentOptions: string[];
  onSave: (selectedOptions: string[]) => void;
}

export function HealthConsiderationsAlert({
  title,
  currentOptions,
  onSave
}: HealthConsiderationsAlertProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentOptions);
  const options: string[] = [
    'Developmental delays',
    'Autism spectrum',
    'ADHD',
    'Speech or language challenges',
    'Hearing impairment',
    'Vision impairment',
    'Motor skill challenges',
    'Physical disabilities or limitations',
    'Emotional or behavioral concerns'
  ];

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSave = () => {
    onSave(selectedOptions);
  };

  return (
    <AlertDialog>
      {/* Trigger Icon */}
      <AlertDialogTrigger asChild={true}>
        <Plus size={20} className='text-primary' />
      </AlertDialogTrigger>

      <AlertDialogContent className='w-[90%]'>
        <AlertDialogHeader className='flex flex-row items-center justify-between'>
          <CheckCircle size={28} className='text-primary' />
          <AlertDialogTitle className='text-xl text-primary font-medium'>
            <Text>{title}</Text>
          </AlertDialogTitle>
          <AlertDialogCancel className='border-primary rounded-xxl text-center native:w-9 native:h-9'>
            <X size='24' className='text-primary' />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className='text-lg mb-4'>
          <Text>Select health considerations and provide custom input if necessary.</Text>
        </AlertDialogDescription>

        {/* Options List */}

        <ScrollView className='h-[510px]' scrollEnabled={true} persistentScrollbar={true}>
          {options.map((option) => (
            <Button
              key={option}
              className={`w-full mb-2 ${
                selectedOptions.includes(option) ? 'bg-primary' : 'bg-white border'
              }`}
              onPress={() => toggleOption(option)}
            >
              <Text className={selectedOptions.includes(option) ? 'text-white' : 'text-primary'}>
                {option}
              </Text>
            </Button>
          ))}
        </ScrollView>

        {/* Custom Input */}

        {/* Footer */}
        <AlertDialogFooter className='flex flex-row justify-end'>
          <AlertDialogCancel className='border-primary text-primary rounded-xl w-24 text-center'>
            <Text className='text-xl bg-inherit'>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogCancel
            className='bg-primary text-white rounded-xl w-24 text-center'
            onPress={handleSave}
          >
            <Text className='text-xl bg-inherit'>Save</Text>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
