"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { WeaponFormData, WeaponFormSchema } from "~/lib/schemas/weapon-schemas";
import { TechnologyRatingEnum } from "~/lib/tech-rating";
import { WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { handleWeaponFormSubmit } from "../actions";

interface WeaponFormProps {
  weapon?: WeaponFormData;
}

export function WeaponForm({ weapon }: WeaponFormProps) {
  const router = useRouter();
  const form = useForm<WeaponFormData>({
    resolver: zodResolver(WeaponFormSchema),
    defaultValues: weapon ?? getDefaultWeaponFormValues(),
    mode: "onChange",
  });

  async function onSubmit(values: WeaponFormData) {
    try {
      await handleWeaponFormSubmit(values);
      router.push("/weapons");
    } catch (error) {
      console.error("Failed to submit weapon form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is the name of the weapon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heat</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This heat generated by the weapon when fired.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="damage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Damage</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>The damage dealt by the weapon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Range</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>The range of the weapon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weaponType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weapon Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a weapon type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(WeaponTypeEnum).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The type of the weapon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="techRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a technology rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(TechnologyRatingEnum).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value} - {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The technology rating of the weapon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function getDefaultWeaponFormValues() {
  return {
    id: undefined,
    name: "",
    heat: "0",
    damage: "0",
    range: "0/0/0/0",
    ammoPerTon: null,
    weight: 1,
    criticalSlots: 1,
    weaponType: WeaponTypeEnum.Energy,
    techRating: TechnologyRatingEnum.CommonTech,
  } as const satisfies WeaponFormData;
}
