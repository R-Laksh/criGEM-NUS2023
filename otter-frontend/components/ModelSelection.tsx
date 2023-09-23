/**
 * This is a React component that renders a model selection dropdown using the `react-select` library
 * and fetches the available models from an API using `useSWR`.
 */
'use client'
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch('/api/getEngines').then(res => res.json())

function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'Select a model'
  });

    return (
      <div className="mt-2">
        <Select 
          className="mt-2"
          options={models?.modelOptions}
          defaultValue = {model}
          placeholder = {model}
          isSearchable
          isLoading={isLoading}
          menuPosition='fixed'
          classNames={{
            control: (state) => "bg-[#434654] border-[#434654]",
          }}
          onChange={(e) => setModel(e.value)}
        /></div>
    )
}

export default ModelSelection 
