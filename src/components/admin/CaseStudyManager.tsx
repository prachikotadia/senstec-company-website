
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp, CaseStudy } from '@/contexts/AppContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CaseStudyManager = () => {
  const { caseStudies, setCaseStudies } = useApp();
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    industry: '',
    problem: '',
    solution: '',
    outcome: ''
  });

  const industries = ['Bridge', 'Marine', 'Dam', 'Building', 'Other'];

  const handleCreate = () => {
    setIsCreating(true);
    setEditingStudy(null);
    setFormData({
      title: '',
      client: '',
      location: '',
      industry: '',
      problem: '',
      solution: '',
      outcome: ''
    });
  };

  const handleEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setIsCreating(false);
    setFormData({
      title: study.title,
      client: study.client,
      location: study.location,
      industry: study.industry,
      problem: study.problem,
      solution: study.solution,
      outcome: study.outcome
    });
  };

  const handleSave = () => {
    const newStudy: CaseStudy = {
      id: editingStudy?.id || Date.now().toString(),
      ...formData
    };

    if (editingStudy) {
      setCaseStudies(caseStudies.map(study => study.id === editingStudy.id ? newStudy : study));
    } else {
      setCaseStudies([newStudy, ...caseStudies]);
    }

    setEditingStudy(null);
    setIsCreating(false);
    setFormData({
      title: '',
      client: '',
      location: '',
      industry: '',
      problem: '',
      solution: '',
      outcome: ''
    });
  };

  const handleDelete = (id: string) => {
    setCaseStudies(caseStudies.filter(study => study.id !== id));
  };

  const handleCancel = () => {
    setEditingStudy(null);
    setIsCreating(false);
  };

  if (isCreating || editingStudy) {
    return (
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>{editingStudy ? 'Edit Case Study' : 'Create New Case Study'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter project title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Client name"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Project location"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full p-2 border border-input bg-background rounded-md"
            >
              <option value="">Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="problem">Problem Statement</Label>
            <Textarea
              id="problem"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="Describe the challenge"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="Describe the solution implemented"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="outcome">Outcome</Label>
            <Textarea
              id="outcome"
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="Describe the results and impact"
              rows={3}
            />
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleSave} className="gradient-purple">
              {editingStudy ? 'Update Study' : 'Create Study'}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Case Studies</h2>
        <Button onClick={handleCreate} className="gradient-purple">
          <Plus className="w-4 h-4 mr-2" />
          New Case Study
        </Button>
      </div>

      <div className="grid gap-4">
        {caseStudies.map((study) => (
          <Card key={study.id} className="glass-morphism">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{study.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Client: {study.client}</p>
                      <p className="text-sm text-muted-foreground">Location: {study.location}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                        {study.industry}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    <strong>Problem:</strong> {study.problem.substring(0, 100)}...
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Outcome:</strong> {study.outcome.substring(0, 100)}...
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(study)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(study.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyManager;
