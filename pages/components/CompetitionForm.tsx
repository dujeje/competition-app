import React, { useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { generateRoundRobin } from '../../utilis/scheduleGenerator'; // Import your schedule generator function

type Match = { team1: string; team2: string };
type Schedule = Match[];

interface CompetitionFormProps {
    user: UserProfile;
}

function CompetitionForm({ user }: CompetitionFormProps) {
    const [competitionName, setCompetitionName] = useState('');
    const [competitors, setCompetitors] = useState('');
    const [scoringSystem, setScoringSystem] = useState('');
    const [schedule, setSchedule] = useState<Schedule>([]);
    const [error, setError] = useState<string | null>(null);

    const validateInput = (): boolean => {
        const competitorsArray = competitors.split(',');
        const scoringSystemRegex = /^\d+\/\d+\/\d+$/;

        if (competitorsArray.length < 4 || competitorsArray.length > 8) {
            setError('Number of competitors must be between 4 and 8.');
            return false;
        }

        if (!scoringSystem.match(scoringSystemRegex)) {
            setError('Scoring system must be in the format "number/number/number".');
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateInput()) {
            const competitorsArray = competitors.split(',');
            const generatedSchedule = generateRoundRobin(competitorsArray);
            setSchedule(generatedSchedule);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create a Competition</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <label className="block mb-2">
                    Competition Name:
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={competitionName}
                        onChange={(e) => setCompetitionName(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    List of Competitors (separated by commas):
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={competitors}
                        onChange={(e) => setCompetitors(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    Scoring System(Win/Draw/Loss):
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={scoringSystem}
                        onChange={(e) => setScoringSystem(e.target.value)}
                    />
                </label>
                {error && <p className="text-red-600 mb-2">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Create Competition
                </button>
            </form>
            {schedule && schedule.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold mt-4">Generated Schedule</h3>
                    <ul className="list-disc ml-4">
                        {schedule.map((match: Match, index: number) => (
                            <li key={index} className="text-gray-700">
                                {match.team1} vs {match.team2}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CompetitionForm;
