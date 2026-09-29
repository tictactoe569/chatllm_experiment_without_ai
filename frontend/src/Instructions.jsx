const { useEffect, useMemo, useRef, useState, useCallback } = React;

function Instructions({ open, onClose }) {
    const [value, setValue]= useState("");
    const [loading, setLoading] =  useState(false);
    const [saving, setSaving]= useState(false);
    const [error, setError]= useState("");

    useEffect(() => {
    
        if (!open) return;

        setLoading(true);
        setError("");

        getMyInstructions()
            .then((data) =>setValue(data.Instructions || ""))
            .catch((err)=>setError(err.message))
            .finally(()=> setLoading(false));
    }, [open]);


    async function handleSave() {
        try{
            setSaving(true);
            setError("");
            const data = await saveMyInstructions(value);
            setValue(data.Instructions || "");
            onClose();

        } catch(err){
            setError(err.message || "Erro ao salvar");

        } finally{
            setSaving(false);
        }
        
    }

  if (!open) return null;

  return (
    <div className="instructions-backdrop">
        <div className="instructions-modal">
            <h2>
                Instrunção
            </h2>
            {loading?(
                <p>Carregando ...</p>
            ):
            (
                <textarea
                    rows="12"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                />
            )
            }   
            {error && <p clasname="error">{error}</p>}

            <div className="instructions-actions">
                <button onClick={onClose}>
                    Cancelar
                </button>
                <button onClick={handleSave} disable= {saving || loading}
                >
                    {saving? "Salvando..." : "Salvar"}
                </button>
            </div>
        
            
        </div>

                
    </div>

);

}
