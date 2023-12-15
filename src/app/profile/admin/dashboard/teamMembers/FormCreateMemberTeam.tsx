"use client";

import { createMember } from "@/actions/teamMembers/create";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import api from "@/libs/api";
import { type Team } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoMdAddCircleOutline as AddIcon } from "react-icons/io";

const initialState = {
  message: null,
  ok: false,
};

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-boston-blue-600 hover:bg-sushi-500 disabled:opacity-50 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
      disabled={pending}
    >
      <AddIcon />
      {pending ? "CARGANDO..." : "AGREGAR MIEMBRO"}
    </button>
  );
}

export type SelectData = { value: string; label: string }[];

export default function FormCreateMemberTeam() {
  const [state, formAction] = useFormState(createMember, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const [teams, setTeams] = useState<SelectData>([]);

  useEffect(() => {
    state.ok && ref.current?.reset();
  }, [state.ok]);

  useEffect(() => {
    (async () => {
      const { data: teams } = await api<Team[]>("/team");
      const teamOpts = teams.map(({ id: value, teamName: label }) => ({
        value,
        label,
      }));
      setTeams(teamOpts);
    })();
  }, []);

  return (
    <form ref={ref} action={formAction}>
      <div className="mb-4">
        <Input
          inputProps={{
            id: "cc",
            name: "cc",
            type: "text",
            placeholder: "0000000000",
            autoComplete: "off",
            required: true,
          }}
          label="Cédula de Ciudadanía"
        />
      </div>

      <div className="mb-4">
        <Input
          inputProps={{
            id: "fullName",
            name: "fullName",
            type: "text",
            placeholder: "John Doe",
            autoComplete: "off",
            required: true,
          }}
          label="Nombre Completo"
        />
      </div>

      <div className="mb-4">
        <InputSelect
          selectProps={{
            id: "teamId",
            name: "teamId",
            required: true,
          }}
          label="Rol Equipo"
          options={[{ label: "Seleccione un equipo", value: "" }, ...teams]}
        />
      </div>

      <Submit />

      {state.message && (
        <div
          className="p-4 m-4 text-sm text-slate-100 rounded-lg bg-sushi-400/80 text-center"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}
    </form>
  );
}
