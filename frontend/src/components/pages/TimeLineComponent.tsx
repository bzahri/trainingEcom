import { Timeline, Text, Title } from '@mantine/core';
import { IconCheck, IconCircleDashed, IconClock } from '@tabler/icons-react';
import { Container } from 'postcss';

const TimeLineComponent = () => {
    return (
        <>
            <Title order={2} mb="md" >Historique des étapes</Title>
            <Timeline active={2} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<IconCheck size={16} />} title="Étape 1">
                    <Text c="dimmed" size="sm">Début du projet</Text>
                    <Text size="xs" mt={4}>01 Mars 2024</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconClock size={16} />} title="Étape 2">
                    <Text c="dimmed" size="sm">Phase de développement</Text>
                    <Text size="xs" mt={4}>10 Mars 2024</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconCircleDashed size={16} />} title="Étape 3">
                    <Text c="dimmed" size="sm">Tests et validation</Text>
                    <Text size="xs" mt={4}>20 Mars 2024</Text>
                </Timeline.Item>

                <Timeline.Item title="Étape 4">
                    <Text c="dimmed" size="sm">Lancement officiel</Text>
                    <Text size="xs" mt={4}>30 Mars 2024</Text>
                </Timeline.Item>
            </Timeline>
        </>
    );
}

export default TimeLineComponent;