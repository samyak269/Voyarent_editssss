'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAtom, useSetAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateListingFooter from '@/components/footer/create-listing-footer';
import { storeAtom, stepAtom } from '@/components/add-listing/add-listing';
import Input from '@/components/ui/form-fields/input';
import Text from '@/components/ui/typography/text';
import { useEffect, useState } from 'react';

const EquipmentSchema = z
  .object({
    engine: z.string(),
    engineTorque: z.string(),
    fuelSystem: z.string(),
    boreStroke: z.string(),
    infotainmentSystem: z.string(),
    displacement: z.string(),
    fuelCapacity: z.string(),
    compressionRatio: z.string(),
    luggageCapacity: z.string(),
    fuelEconomy: z.string(),
    weight: z.string(),
  })
  .optional();

type EquipmentSchemaType = z.infer<typeof EquipmentSchema>;

export default function AddSpecification() {
  const setStep = useSetAtom(stepAtom);
  const [store, setStore] = useAtom(storeAtom);
  const [fetchError, setFetchError] = useState<null | string>(null)
  const {
    handleSubmit,
    register,
    formState: { errors },
    // @ts-ignore
  } = useForm<EquipmentSchemaType>({
    resolver: zodResolver(EquipmentSchema),
  });

  function handleSpecification(data: any) {

    setStore({
      ...store,
      specification: data,
    });
  }

  useEffect(() => {
    if (
      store.specification.engine.length > 0 &&
      store.specification.engineTorque.length > 0 &&
      store.specification.fuelSystem.length > 0 &&
      store.specification.boreStroke.length > 0 &&
      store.specification.infotainmentSystem.length > 0 &&
      store.specification.displacement.length > 0 &&
      store.specification.fuelCapacity.length > 0 &&
      store.specification.compressionRatio.length > 0 &&
      store.specification.luggageCapacity.length > 0 &&
      store.specification.fuelEconomy.length > 0 &&
      store.specification.weight.length > 0
    ) {
      let storeToSend = store
      // @ts-ignore
      storeToSend.images = storeToSend.images.map((image) => image.key)
      fetch('/api/listings/create-listing', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          store: storeToSend
        })
      })
        .then((resp) => {
          return resp.json()
        })
        .then((resp) => {
          if (resp.success === true) {
            setStep(7);
          } else {
            setFetchError(resp.error)
          }
        })
    }
  }, [store.specification])

  return (
    <div className="w-full md:w-[448px] xl:w-[648px]">
      <form
        noValidate
        onSubmit={handleSubmit((data) => handleSpecification(data))}
      >
        <Text
          tag="h3"
          className="mb-4 text-lg !font-medium md:!text-xl lg:mb-6 2xl:!text-2xl"
        >
          Now, set your boat specifications
        </Text>
        <div className="grid grid-cols-1 gap-4">
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Engine
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('engine')}
              error={errors?.engine?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Engine Torque
            </Text>
            <Input
              type="text"
              placeholder="111 ft-lb"
              inputClassName="!h-10 lg:!h-12"
              {...register('engineTorque')}
              error={errors?.engineTorque?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Fuel System
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('fuelSystem')}
              error={errors?.fuelSystem?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Bore x Stroke
            </Text>
            <Input
              type="text"
              placeholder="111 ft-lb"
              inputClassName="!h-10 lg:!h-12"
              {...register('boreStroke')}
              error={errors?.boreStroke?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Infotainment System
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('infotainmentSystem')}
              error={errors?.infotainmentSystem?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Displacement
            </Text>
            <Input
              type="text"
              placeholder="111 ft-lb"
              inputClassName="!h-10 lg:!h-12"
              {...register('displacement')}
              error={errors?.displacement?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Fuel Capacity
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('fuelCapacity')}
              error={errors?.fuelCapacity?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Compression Ratio
            </Text>
            <Input
              type="text"
              placeholder="111 ft-lb"
              inputClassName="!h-10 lg:!h-12"
              {...register('compressionRatio')}
              error={errors?.compressionRatio?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Luggage Capacity -Volume
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('luggageCapacity')}
              error={errors?.luggageCapacity?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Fuel Economy
            </Text>
            <Input
              type="text"
              placeholder="111 ft-lb"
              inputClassName="!h-10 lg:!h-12"
              {...register('fuelEconomy')}
              error={errors?.fuelEconomy?.message}
            />
          </div>
          <div className="gap-2 lg:grid lg:items-center xl:grid-cols-2">
            <Text className="mb-2 font-medium md:font-bold lg:mb-0">
              Weight
            </Text>
            <Input
              type="text"
              placeholder="Milwaukee-Eight 107"
              inputClassName="!h-10 lg:!h-12"
              {...register('weight')}
              error={errors?.weight?.message}
            />
          </div>
        </div>
        <CreateListingFooter onBack={() => setStep(5)} />
      </form>
    </div>
  );
}
