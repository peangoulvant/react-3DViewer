/**
 * Classe utilitaire pour les effets apposés sur les objets 3D
 */
class Effect {
    // Coefficient de flottaison
    private static buoyancyThreshold: number = 0.001;

    /**
     * Ajoute un effet de flottaison à un objet 3D
     * @param positionY 
     * @returns 
     */
    public static addBuoyancy(positionY: number): number {
        return positionY + Math.sin(Date.now() * Effect.buoyancyThreshold) * 0.1;
    }

}

export default Effect;