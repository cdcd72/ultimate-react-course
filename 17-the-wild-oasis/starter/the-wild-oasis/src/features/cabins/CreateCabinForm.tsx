import { FieldValues, useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { ICreateUpdateCabin } from '../../models/ICreateUpdateCabin';
import { ICabin } from '../../models/ICabin';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({
  cabinToEdit = {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    regularPrice: 0,
    discount: 0,
    maxCapacity: 0,
    createdAt: new Date(),
  },
  onCloseModal,
}: {
  cabinToEdit?: ICabin;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  function onSubmit(data: FieldValues) {
    const cabin: ICreateUpdateCabin = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      image: data.image[0],
      regularPrice: data.regularPrice,
      discount: data.discount,
      maxCapacity: data.maxCapacity,
    };

    if (isEditSession)
      updateCabin(
        { cabin, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { cabin },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onSubmitError(errors: FieldValues) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for cabin"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow display="none">
        <Input
          type="text"
          id="imageUrl"
          disabled={isWorking}
          {...register('imageUrl')}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
