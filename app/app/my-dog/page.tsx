'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DogProfile } from '../types';

export default function MyDogPage() {
  const [profile, setProfile] = useState<DogProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<DogProfile>>({
    name: '',
    breed: '',
    age: 0,
    ageUnit: 'years',
    allergies: [],
    healthIssues: [],
    medications: [],
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newHealthIssue, setNewHealthIssue] = useState('');
  const [newMedication, setNewMedication] = useState('');

  useEffect(() => {
    // Load dog profile from localStorage
    const savedProfile = localStorage.getItem('dogProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setFormData(parsed);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: DogProfile = {
      ...formData,
      id: profile?.id || crypto.randomUUID(),
      name: formData.name || '',
      breed: formData.breed || '',
      age: formData.age || 0,
      ageUnit: formData.ageUnit || 'years',
      allergies: formData.allergies || [],
      healthIssues: formData.healthIssues || [],
      medications: formData.medications || [],
      createdAt: profile?.createdAt || new Date(),
      updatedAt: new Date(),
    } as DogProfile;

    localStorage.setItem('dogProfile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const addItem = (type: 'allergy' | 'health' | 'medication', value: string) => {
    if (!value.trim()) return;

    if (type === 'allergy') {
      setFormData({ ...formData, allergies: [...(formData.allergies || []), value] });
      setNewAllergy('');
    } else if (type === 'health') {
      setFormData({ ...formData, healthIssues: [...(formData.healthIssues || []), value] });
      setNewHealthIssue('');
    } else {
      setFormData({ ...formData, medications: [...(formData.medications || []), value] });
      setNewMedication('');
    }
  };

  const removeItem = (type: 'allergy' | 'health' | 'medication', index: number) => {
    if (type === 'allergy') {
      const updated = [...(formData.allergies || [])];
      updated.splice(index, 1);
      setFormData({ ...formData, allergies: updated });
    } else if (type === 'health') {
      const updated = [...(formData.healthIssues || [])];
      updated.splice(index, 1);
      setFormData({ ...formData, healthIssues: updated });
    } else {
      const updated = [...(formData.medications || [])];
      updated.splice(index, 1);
      setFormData({ ...formData, medications: updated });
    }
  };

  if (!isEditing && profile) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/app" className="text-2xl font-bold text-[#143F3F]">
              Frito Paws
            </Link>
            <Link href="/app" className="text-[#5BA69E] hover:text-[#143F3F]">
              ← Back
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#143F3F]">{profile.name}'s Profile</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-[#5BA69E] text-white rounded-full hover:bg-[#143F3F] transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#143F3F] mb-4">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem label="Name" value={profile.name} />
                <InfoItem label="Breed" value={profile.breed} />
                <InfoItem label="Age" value={`${profile.age} ${profile.ageUnit}`} />
                {profile.weight && (
                  <InfoItem label="Weight" value={`${profile.weight} ${profile.weightUnit}`} />
                )}
              </div>
            </div>

            {/* Vet Information */}
            {(profile.vetName || profile.vetPhone || profile.vetAddress) && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#143F3F] mb-4">Veterinarian</h2>
                <div className="space-y-2">
                  {profile.vetName && <InfoItem label="Name" value={profile.vetName} />}
                  {profile.vetPhone && <InfoItem label="Phone" value={profile.vetPhone} />}
                  {profile.vetAddress && <InfoItem label="Address" value={profile.vetAddress} />}
                </div>
              </div>
            )}

            {/* Health Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#143F3F] mb-4">Health Information</h2>

              {profile.allergies.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.allergies.map((allergy, i) => (
                      <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.healthIssues.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Health Issues</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.healthIssues.map((issue, i) => (
                      <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.medications.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Medications</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.medications.map((med, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            {profile.emergencyContact && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#143F3F] mb-4">Emergency Contact</h2>
                <div className="space-y-2">
                  <InfoItem label="Name" value={profile.emergencyContact.name} />
                  <InfoItem label="Phone" value={profile.emergencyContact.phone} />
                  <InfoItem label="Relationship" value={profile.emergencyContact.relationship} />
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {profile.additionalNotes && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#143F3F] mb-4">Additional Notes</h2>
                <p className="text-gray-700">{profile.additionalNotes}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/app" className="text-2xl font-bold text-[#143F3F]">
            Frito Paws
          </Link>
          <Link href="/app" className="text-[#5BA69E] hover:text-[#143F3F]">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#143F3F] mb-8">
          {profile ? 'Edit Dog Profile' : 'Create Dog Profile'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="Frito"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Breed *
                </label>
                <input
                  type="text"
                  required
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="Golden Retriever"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  />
                  <select
                    value={formData.ageUnit}
                    onChange={(e) => setFormData({ ...formData, ageUnit: e.target.value as 'months' | 'years' })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || undefined })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  />
                  <select
                    value={formData.weightUnit || 'kg'}
                    onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value as 'kg' | 'lbs' })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Veterinarian Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Veterinarian (Optional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vet Name
                </label>
                <input
                  type="text"
                  value={formData.vetName || ''}
                  onChange={(e) => setFormData({ ...formData, vetName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="Dr. Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vet Phone
                </label>
                <input
                  type="tel"
                  value={formData.vetPhone || ''}
                  onChange={(e) => setFormData({ ...formData, vetPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="+44 20 1234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vet Address
                </label>
                <textarea
                  value={formData.vetAddress || ''}
                  onChange={(e) => setFormData({ ...formData, vetAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  rows={2}
                  placeholder="123 High Street, Chiswick, London"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Health Information</h2>

            {/* Allergies */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Allergies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('allergy', newAllergy))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="e.g., Chicken, Wheat"
                />
                <button
                  type="button"
                  onClick={() => addItem('allergy', newAllergy)}
                  className="px-4 py-2 bg-[#5BA69E] text-white rounded-lg hover:bg-[#143F3F] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.allergies?.map((allergy, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-2">
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeItem('allergy', i)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Health Issues */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Health Issues
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newHealthIssue}
                  onChange={(e) => setNewHealthIssue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('health', newHealthIssue))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="e.g., Hip dysplasia, Arthritis"
                />
                <button
                  type="button"
                  onClick={() => addItem('health', newHealthIssue)}
                  className="px-4 py-2 bg-[#5BA69E] text-white rounded-lg hover:bg-[#143F3F] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.healthIssues?.map((issue, i) => (
                  <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2">
                    {issue}
                    <button
                      type="button"
                      onClick={() => removeItem('health', i)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Medications
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('medication', newMedication))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="e.g., Pain medication, Supplements"
                />
                <button
                  type="button"
                  onClick={() => addItem('medication', newMedication)}
                  className="px-4 py-2 bg-[#5BA69E] text-white rounded-lg hover:bg-[#143F3F] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medications?.map((med, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                    {med}
                    <button
                      type="button"
                      onClick={() => removeItem('medication', i)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Emergency Contact (Optional)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact?.name || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value } as any
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value } as any
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, relationship: e.target.value } as any
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                  placeholder="e.g., Family member, Friend"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Additional Notes</h2>
            <textarea
              value={formData.additionalNotes || ''}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
              rows={4}
              placeholder="Any other important information about your dog..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#5BA69E] text-white rounded-full hover:bg-[#143F3F] transition-colors font-semibold"
            >
              {profile ? 'Update Profile' : 'Create Profile'}
            </button>
            {profile && (
              <button
                type="button"
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-gray-600">{label}</div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
}
