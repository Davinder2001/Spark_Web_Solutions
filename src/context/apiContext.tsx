'use client';
import {
    createContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

// Interface for sector data
interface Sector {
    id: number;
    name: string;
    description: string;
    acf:object;
}

// Interface for context props
interface SectorDataContextProps {
    homeSecondSection: Sector[] | null; // Changed from sectorData to homeSecondSection
    loading: boolean;
    error: string | null;
}

// Create the context
export const SectorDataContext = createContext<SectorDataContextProps | undefined>(undefined);

// Provider component
export const SectorDataProvider = ({ children }: { children: ReactNode }) => {
    const [homeSecondSection, setHomeSecondSection] = useState<Sector[]>([]); // Changed sectorData to homeSecondSection
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // UseEffect for fetching data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading state 
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=home`);
                if (!response.ok) throw new Error('Failed to fetch sector data');
                const data: unknown = await response.json();
                setHomeSecondSection(data as Sector[]); // Changed setSectorData to setHomeSecondSection

            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <SectorDataContext.Provider value={{ homeSecondSection, loading, error }}> {/* Changed sectorData to homeSecondSection */}
            {children}
        </SectorDataContext.Provider>
    );
};
