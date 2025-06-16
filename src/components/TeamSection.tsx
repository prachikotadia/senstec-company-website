import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Dr. Juan Ahuir Torres',
      position: 'Technical & Simulation Expert',
      image: '/assets/pic1.jpg',
      bio: 'Dr. Juan Ahuir Torres brings over 10 years of experience in materials science, specializing in advanced processing techniques, computational simulation, mechanical behavior analysis, and state-of-the-art material characterization. His work bridges the gap between theoretical modeling and practical applications across structural and industrial materials.',
      expertise: 'Materials Processing, Finite Element Simulation, Mechanical Behavior Analysis, Microstructural Characterization (SEM, XRD), Failure Mechanics'
    },

    {
    name: 'Parita Kotadia',
    position: 'CEO',
    image: '/assets/pic2.jpg',
    bio: 'Experienced professional with a passion for driving ideas forward and leading teams toward success.',
    expertise: 'Leadership, Strategy, Operations, Collaboration'
    }

  ];

  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-sf-pro">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter leading-relaxed">
            World-class experts in structural engineering, AI, and sensor technology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-morphism hover-float spotlight-effect">
              <CardContent className="p-8 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-6 shadow-lg border border-muted"
                />
                <h3 className="text-xl font-bold mb-2 text-foreground font-sf-pro">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">{member.position}</p>
                <p className="text-muted-foreground mb-4 text-sm">{member.bio}</p>
                <div className="text-xs text-muted-foreground">
                  <strong>Expertise:</strong> {member.expertise}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
